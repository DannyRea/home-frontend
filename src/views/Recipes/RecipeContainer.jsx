import { React, PureComponent } from "react";
import { inject, observer } from "mobx-react";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";
import DBRecipeDialogButton from "./Buttons/DBRecipe.DialogButton";

class RecipeContainer extends PureComponent {
  render() {
    const {
      foodStore: {
        randomRecipe,
        ingredientsAndMeasurements,
        refresh,
        isRefreshing,
      },
    } = this.props;
    return (
      <>
        <span
          style={{ right: "0px", position: "absolute", padding: "10px" }}
          title="Refresh"
        >
          <Button
            variant="contained"
            size="large"
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
            onClick={() => refresh()}
          >
            <AutorenewIcon />
          </Button>
          <DBRecipeDialogButton />
        </span>
        {!isRefreshing ? (
          <>
            <TableContainer component={Paper}>
              <div style={{ alignItems: "center", padding: "5px" }}>
                <b style={{ fontSize: "36px" }}>{randomRecipe.strMeal}</b>
              </div>
              <Card color="blue">
                <CardMedia
                  component="img"
                  height="500"
                  width="500"
                  image={`${randomRecipe.strMealThumb}`}
                  alt={"recipe-img"}
                />
              </Card>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Ingredients</TableCell>
                    <TableCell align="center">Measurements</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredientsAndMeasurements.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row[`strIngredient${index + 1}`]}
                      </TableCell>
                      <TableCell align="center">
                        {row[`strMeasure${index + 1}`]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div>Directions:</div>
            <div>{randomRecipe.strInstructions}</div>
          </>
        ) : (
          <Skeleton
            variant="rectangular"
            width={window.innerWidth - 750}
            height={window.innerHeight}
          />
        )}
      </>
    );
  }
}
export default inject("foodStore")(observer(RecipeContainer));
