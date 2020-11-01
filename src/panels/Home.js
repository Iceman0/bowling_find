import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import {FormLayout, FormLayoutGroup, Input} from '@vkontakte/vkui/';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

const Home = ({ id, go, fetchedUser }) => {


    return (<Panel id={id}>
            <PanelHeader>Example</PanelHeader>
            {fetchedUser &&
            <Group title="User Data Fetched with VK Bridge">
                <Cell
                    before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                    description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                >
                    {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                </Cell>
            </Group>}

            <Group title="Navigation Example">
                <Div>
                    <Button size="xl" level="2" onClick={go} data-to="persik">
                    Show me the Persik, please
                    </Button>
                    {/*<FormLayout>*/}
                        {/*<FormLayoutGroup top="Фамилия">*/}
                            {/*<Input type="text" defaultValue="" placeholder="Введите фамилию"/>*/}
                        {/*</FormLayoutGroup>*/}
                        {/*<FormLayoutGroup top="Имя">*/}
                            {/*<Input type="text" defaultValue="" placeholder="Введите имя"/>*/}
                        {/*</FormLayoutGroup>*/}
                        {/*<FormLayoutGroup top="Команда">*/}
                            {/*<Input type="text" defaultValue="" placeholder="Введите название команды"/>*/}
                        {/*</FormLayoutGroup>*/}
                        {/*<Input type="number" placeholder="Повторите кол-во очков"/>*/}
                        {/*<Button size="xl">Отправить</Button>*/}
                    {/*</FormLayout>*/}
                </Div>
            </Group>
        </Panel>
    );
}

Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;
