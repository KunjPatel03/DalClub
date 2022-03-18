import { Box, Typography, Grid } from "@mui/material";

const EventCard = () => {
  return (
    <Box
      borderRadius={1}
      border={"1px solid lightgray"}
      margin={1.25}
      sx={{
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
          boxShadow: "0 0 5px -1px",
        },
      }}
    >
      <img
        src={`https://via.placeholder.com/600x400?text=Event`}
        width="100%"
        height="100%"
      />
      <Grid
        container
        p={1}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography fontWeight={"bold"} color="primary.main">
            Event
          </Typography>
          <Typography mt={-0.5} fontSize={"0.8rem"} color="grey.700">
            19-12-2022
          </Typography>
        </Box>
        <Typography fontWeight={"bold"} color="secondary.light">
          $20
        </Typography>
      </Grid>
    </Box>
  );
};

export default EventCard;
