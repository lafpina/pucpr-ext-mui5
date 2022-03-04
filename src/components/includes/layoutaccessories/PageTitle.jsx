import Typography from '@mui/material/Typography'

const PageTitle = (props) => {
    return (
        <Typography variant="h6" sx={{ color: '#757575', flexGrow: 1 }} >
            {props.title}
        </Typography>
    )
}

export default PageTitle