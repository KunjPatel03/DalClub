import { Box, Typography } from "@mui/material";

const PageBanner = ({ title = "Banner" }) => {
  return (
    <Box position={"relative"}>
      <Box
        component={"img"}
        height={"35vh"}
        width={"100%"}
        sx={{ objectFit: "cover" }}
        src={`https://via.placeholder.com/1800x200?text=${"title"}`}
        alt={title}
      />
      <Typography
        position={"absolute"}
        top="50%"
        left={"50%"}
        variant="h4"
        fontWeight={"bold"}
        sx={{ transform: "translate(-50%, -50%)" }}
      >
        Banner Title
      </Typography>
    </Box>
  );
};

export default PageBanner;
