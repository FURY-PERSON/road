import { Project } from 'ts-morph';

function isAbsolute(value: string) {
  if (
    ['app', 'shared', 'entities', 'features', 'widgets', 'pages'].some((layer) =>
      value.startsWith(layer)
    )
  ) {
    return true;
  }

  return false;
}

const project = new Project();
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

files.forEach((file) => {
  const importDeclarations = file.getImportDeclarations();

  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();

    if (isAbsolute(value)) {
      importDeclaration.setModuleSpecifier(`@/${value}`);
    }
  });
});

project.save();
