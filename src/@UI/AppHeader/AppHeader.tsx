import React,{FC} from 'react'
import { Flex,Heading,useTheme,Theme } from '@chakra-ui/react';

const AppHeader: FC = () =>{

const theme= useTheme()

    return<Flex
    as="nav"
    flex='1'
    mb={4}
    padding='1.5rem'
    bg={theme.colors.blue[600]}
    color={theme.colors.gray[400]}
    >

        <Heading size="md">
            Recording Audio / Video /Screen 
        </Heading>
    </Flex>
}
export default AppHeader;