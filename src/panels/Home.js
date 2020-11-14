import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import {FormLayout, FormLayoutGroup, Input, Snackbar, Icon24Favorite} from '@vkontakte/vkui/';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import bridge from '@vkontakte/vk-bridge';
import {btnSendClick} from './../utils/sendCLick'
import {Row, Col, Table} from 'antd'
import 'antd/dist/antd.css';

const orangeBackground = {
    backgroundImage: 'linear-gradient(135deg, #ffb73d, #ffa000)'
};

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const bufColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const Home = ({ id, go, fetchedUser }) => {

    // const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    const [findResult, setFindResult] =  useState([]);
    const [columns, setColumns] =  useState(bufColumns);

    // const onChange = (e) => {
    //     let { value } = e.currentTarget;
    //     if (((value <= 300 && value >= 0) || value === '')) setCount( (value === '') ? value : parseInt(value) );
    // };

    const btnFindClick = (name) => {
        btnSendClick(name, setFindResult, setColumns)
    };

    return (<Panel id={id}>
            <PanelHeader>Введите свой результат</PanelHeader>
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
                    <FormLayout className="bowl-Form">
                        <FormLayoutGroup top="Поиск">
                            <Input type="text" value={name} placeholder="Введите необходимые слова" onChange={e => setName(e.target.value)}/>
                        </FormLayoutGroup>
                        <Button size="xl" onClick={() => btnFindClick(name)}>Найти</Button>
                    </FormLayout>
                    {(findResult && findResult.length > 0) ? <Table dataSource={findResult} columns={columns} scroll={{ x: 1500 }} /> : ''}
                </Div>
            </Group>
        </Panel>
    );
};

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
