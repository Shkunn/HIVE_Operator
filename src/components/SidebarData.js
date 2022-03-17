import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/HIVE_Operator/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'History',
    path: '/HIVE_Operator/history',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Statistics',
    path: '/HIVE_Operator/statistics',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/HIVE_Operator/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];