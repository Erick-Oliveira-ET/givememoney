import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ChildContainer, Container, Item } from "./styled";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/products");
  };

  return (
    <Container container>
      <ChildContainer container alignItems="center" justifyContent="center">
        <Grid item>
          <Typography variant="h1" align="center">
            Bem-vindo, viajante.
          </Typography>
          <Typography variant="h4" align="center">
            Deixe uma moedinha pra um amigo cansado.
          </Typography>
          <Typography variant="h6" align="center">
            Veja o que tenho a oferecer.
          </Typography>
          <Item>
            <Button
              variant="outlined"
              sx={{ paddingTop: "10px" }}
              onClick={handleButtonClick}
            >
              Produtos
            </Button>
          </Item>
        </Grid>
      </ChildContainer>
    </Container>
  );
}
