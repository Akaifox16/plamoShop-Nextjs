import dynamic from 'next/dynamic'
// const Selected = dynamic(() => {import('./selected')}) 
// const NonSelect = dynamic(() => {import('./nonSelect')}) 
import Selected from './selected'
import NonSelect from './nonSelect'

export default function ConditionSelectBox(props){
    if(props.selected == 1){
        return <Selected addressNo = {props.addressNo}/>
    }
    return <NonSelect addressNo = {props.addressNo}/>
}

