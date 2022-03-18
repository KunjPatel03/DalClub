import { Typography, Box } from "@mui/material"

const InfoSection = ({ isReverse = false }) => {
  return (
    <Box display={"flex"} alignItems="center" flexDirection={isReverse ? "row-reverse" : "row"}>
      <Box width={"50%"} height="350px">
      <img
        src={`https://via.placeholder.com/600x400?text=Info+Section`}
        width="100%"
        height="100%"
      />
      </Box>
      <Box width={"50%"} display="flex" justifyContent={"center"} alignContent="center">
        <Box maxWidth={"75%"}>
          <Typography variant="h5" fontWeight={"bold"} color="primary.main" mb={1}>Title</Typography>
          <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut mi non purus faucibus condim ac non justo. Curabitur ligula nisi, efficitur in ullam et, feugiat et libero</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default InfoSection