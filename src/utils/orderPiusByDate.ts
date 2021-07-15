import { Piu } from 'components/Piu';

const orderPiusByDate = (piusArray: Piu[]) => {
    type Tuple = [Piu, Date];

    let sortable: Tuple[];
    sortable = [];
    for (const piu of piusArray) {
        sortable.push([piu, piu.created_at]);
    }
    sortable.sort(function (a, b) {
        return Number(a[1]) - Number(b[1]);
    });

    let result = [];
    for (const tuple of sortable) {
        result.push(tuple[0]);
    }
    return result;
}

export default orderPiusByDate;