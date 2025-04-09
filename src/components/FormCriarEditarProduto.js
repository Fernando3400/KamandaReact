import "./form-editar-criar-produto.modules.css";

function FormCriarEditarProduto({titulo}) {
    return (
        <form className="cadastro" onSubmit={(e) => e.preventDefault()}>
            <h2 className="titulo">{titulo}</h2>
           
        </form>
    );
}

export default FormCriarEditarProduto;