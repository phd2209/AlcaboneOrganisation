
import PropTypes from 'prop-types';

// material-ui
import { Chip, Grid, Stack, Typography, Card, CardContent } from '@mui/material';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //
const AlcaboneStatistic = ({ color, title, count, percentage, extra }) => (
            <Card
                elevation={0}
                sx={{
                    border:'1px solid',
                    borderRadius: 2,
                    borderColor: color,
                    background: "#000",
                    /*borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,*/
                    /*boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.customShadows.z1 : 'inherit',*/
                    /*':hover': {
                        boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit'
                    },*/
                    '& pre': {
                        m: 0,
                        p: '12px !important',
                        /*fontFamily: theme.typography.fontFamily,*/
                        fontSize: '0.75rem'
                    }
                }}
            >
               <CardContent sx={{ p: 2.25 }}>    
    
        <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
                {title}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h4" color="inherit">
                        {count}
                    </Typography>
                </Grid>
                {percentage && (
                    <Grid item>
                        <Chip
                            variant="combined"
                            color={color}
                            label={`${percentage}%`}
                            sx={{ ml: 1.25, pl: 1 }}
                            size="small"
                        />
                    </Grid>
                )}
            </Grid>
        </Stack>
        
        </CardContent>

            </Card>        
);

AlcaboneStatistic.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
}     ;

AlcaboneStatistic.defaultProps = {
    color: 'primary'
};

export default AlcaboneStatistic;
