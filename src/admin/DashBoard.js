import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Title } from 'react-admin';

const useStyles = makeStyles({
    media: {
        display: "block",
        margin: "auto",
        border: "0.1em solid #E5E7E9",
        borderRadius: "0.5em"
    },
    header: {
        textAlign: "center"
    }
});

export default () => {
    const classes = useStyles();
    return (
        <Card>
            {/* <Title title="Военный инновационный технополис ЭРА" /> */}
            <CardHeader className={classes.header} title="Военный инновационный технополис ЭРА" />
            <CardMedia >
                <img className={classes.media} src={"static/3.jpg"} />
            </CardMedia>
            <CardContent>
                <Typography variant="body2" component="p">
                    Цель создания Военного инновационного технополиса ЭРА — обеспечить поиск, развитие и внедрение прорывных технологий в оборонной сфере.
                    Пристальное внимание уделено образовательным программам для молодых ученых в рядах Российской Армии.
                    Расположение Технополиса на морском побережье создает комфортные условия для работы и жизни.
                </Typography>
            </CardContent>
        </Card>
    );
}