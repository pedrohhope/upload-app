import moment from "moment";


const NanoDateFormatter = ({ seconds }: { seconds: number }) => {
    const date = moment.unix(seconds).format("lll");
    return date
}


export { NanoDateFormatter };

