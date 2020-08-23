const useConvertDate = () => {

    const convertDate = rel => {
        const date = new Date(`${rel}`);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        return `${day} ${months[month]}, ${year}`;
    }

    return convertDate;
}

export default useConvertDate;