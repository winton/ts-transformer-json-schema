import * as path from "path";
import * as ts from "typescript";

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => (file: ts.SourceFile) => visitNodeAndChildren(file, program, context);
}

// tslint:disable-next-line:max-line-length
function visitNodeAndChildren(node: ts.SourceFile, program: ts.Program, context: ts.TransformationContext): ts.SourceFile;
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node;
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node {
  // tslint:disable-next-line:max-line-length
  return ts.visitEachChild(visitNode(node, program), (childNode) => visitNodeAndChildren(childNode, program, context), context);
}

function visitNode(node: ts.Node, program: ts.Program): ts.Node {
  const typeChecker = program.getTypeChecker();
  if (!isKeysCallExpression(node, typeChecker)) {
    return node;
  }
  if (!node.typeArguments) {
    return ts.createObjectLiteral();
  }
  const type = typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
  const properties = typeChecker.getPropertiesOfType(type).filter((property) => property.declarations!.length);

  const propertiesLiterals = properties.map((property) => {
    let property_type = typeChecker.typeToString(
      typeChecker.getTypeOfSymbolAtLocation(property, property.declarations![0]));

    if (property_type.includes("[]")) {
      property_type = "array";
    }

    if (property_type.includes("|")) {
      let property_types = property_type.split('|');
      let literal_types = ts.createArrayLiteral(property_types.map( type => type.trim()).
        map(type => {
          return ts.createObjectLiteral([
            ts.createPropertyAssignment("type", ts.createLiteral(type))
          ]) 
        })
      );

      return ts.createPropertyAssignment(property.name, literal_types);
    }

    return ts.createPropertyAssignment(property.name, ts.createLiteral(property_type));
  });

  return ts.createObjectLiteral(propertiesLiterals);
}

const indexTs = path.join(__dirname, "index.ts");
function isKeysCallExpression(node: ts.Node, typeChecker: ts.TypeChecker): node is ts.CallExpression {
  if (!ts.isCallExpression(node)) {
    return false;
  }
  const signature = typeChecker.getResolvedSignature(node);
  if (typeof signature === "undefined") {
    return false;
  }
  const { declaration } = signature;
  return !!declaration
    && !ts.isJSDocSignature(declaration)
    && (path.join(declaration.getSourceFile().fileName) === indexTs)
    && !!declaration.name
    && declaration.name.getText() === "schema";
}
