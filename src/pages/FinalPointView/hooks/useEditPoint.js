

const useEditPoint = ({rowToEdit, open}) => {
    const [info, setInfo] = useState(rowToEdit);



    return {info, setInfo};
}

export default useEditPoint