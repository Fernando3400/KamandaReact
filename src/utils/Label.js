// import '../assets/style/sidebar-menu.css';

function Label(props) {
    const nome = props.nome;
    const conteudo = props.conteudo;
    const className = props.className;  
    const classNameDiv = props.classNameDiv;  
    const htmlFor = props.htmlFor;  
    
    return (
        <div className={classNameDiv}>
            <label htmlFor={htmlFor} className={className}>
                {nome}
            </label>
            {conteudo}
        </div>
    );
  }
  export default Label;
  