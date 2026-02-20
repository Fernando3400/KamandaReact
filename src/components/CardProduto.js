import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CardProduto({ produto }) {
    
    const navigate = useNavigate();
    return (
        <Card
            sx={{
              
                paddingTop: "10px",
                backgroundColor: "white",
                borderRadius: 3,
                boxShadow: 3,

                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                    transform: "scale(1.03)"
                }
            }}
            onClick={() => {
                navigate(`/produto/${produto.id}`);
            }}
        >
            <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${produto.imagem}`}
                alt={produto.nome}
                height="250px"
                sx={{
                    objectFit: "cover",
                    borderRadius: "12px",
                    width: "250px",
                    mx: "auto",
                    display: "block"
                }}
            />

            {produto.emPromocao ? (
                <CardContent>
                    <Typography
                        color="black"
                        variant="h6"
                        fontFamily="fantasy"
                        fontSize="1.2em"
                        gutterBottom
                    >
                        {produto.nome}
                    </Typography>

                    <Typography
                        color="black"
                        variant="body1"
                        sx={{ textDecoration: "line-through" }}
                    >
                        {produto.preco}
                    </Typography>

                    <Typography
                        color="black"
                        fontWeight="700"
                        fontSize="1.2em"
                    >
                        {produto.precoPromocional}
                    </Typography>
                </CardContent>
            ) : (
                <CardContent>
                    <Typography
                        color="black"
                        variant="h6"
                        fontFamily="fantasy"
                        gutterBottom
                    >
                        {produto.nome}
                    </Typography>

                    <Typography
                        color="black"
                        variant="body1"
                    >
                        {produto.preco}
                    </Typography>
                </CardContent>
            )}
        </Card>
    )
}