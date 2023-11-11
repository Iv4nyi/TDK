import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const ScoringBoard = ({ scores }) => {
  return (
    <Card
      sx={{
        width: "fit-content",
        padding: "16px",
        borderRadius: "8px",
        boxShadow:
          "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
      }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Score Board
        </Typography>
        <List>
          {scores.map((player, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={player.name}
                secondary={`Score: ${player.score}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ScoringBoard;
