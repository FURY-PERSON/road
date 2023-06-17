# road
install i18n plugin for tour IDE  

## use shortcut for new components   
Preferences: Configure User Snippets -> typescript (in the VS Code)
``` json
{
	"Create custom react function component": {
	"scope": "typescript, typescriptreact",
	"prefix": "rfm",
	"body": [
	"import { memo, FC } from 'react';",
	"import { classNames } from 'shared/lib/helpers/classNames/classNames';",
	"import cls from './${TM_FILENAME_BASE}.module.scss';",
	"",
	"interface ${TM_FILENAME_BASE}Props {",
	"  className?: string;",
	"}",
	"",
	"export const ${TM_FILENAME_BASE}:FC<${TM_FILENAME_BASE}Props> = memo((props) => {",
	"  const { className } = props;",
	"",
	"  return (",
	"    <div className={classNames(cls.${TM_FILENAME_BASE}, {}, [className])}></div>",
	"  );",
	"})",
	],
	"description": "Создать React-компонент по умолчанию. Импортируется scss-модуль и функция для работы с классами classnames."
	}
}
```  
  
## http://localhost:3000/?showtranslations to see translations  
	  
### highly recommend to add shortcut for lint and stylelint fix 
  
  
### install graphviz (brew install graphviz) to generate dependency graph 