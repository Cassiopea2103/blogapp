import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo= ({timestamp})=>{

    let timeAgo;

    if(timestamp){
        const date= parseISO(timestamp)
        const timePeriod= formatDistanceToNow(date)
        timeAgo= `${timePeriod} ago`
    }

    return <span title= {timestamp}>&nbsp; {timeAgo} ago</span>

}

export default TimeAgo