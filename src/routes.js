import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './pages/Login';
import Listagem from './pages/Listagem'

const Nav = createSwitchNavigator({
    Login,
    Listagem
},{
    initialRouteName: 'Login'
})

export default createAppContainer(Nav)