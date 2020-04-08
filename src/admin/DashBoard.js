import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { Title } from 'react-admin';

export default () => (
    <Card>
        <Title title="Главная страница" />
        <CardHeader title="Военный инновационный технополис ЭРА" />
        <CardContent>
            Цель создания Военного инновационного технополиса ЭРА — обеспечить поиск, развитие и внедрение прорывных технологий в оборонной сфере.
            Пристальное внимание уделено образовательным программам для молодых ученых в рядах Российской Армии.
            Расположение Технополиса на морском побережье создает комфортные условия для работы и жизни.
        </CardContent>
    </Card>
);