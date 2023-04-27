export default function TimestampToDate(time , platform=0){
        if(platform==0){
                var date = new Date(time * 1000);
                // console.log('date 123', date)
                date = date.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
                return String(date);
        }else{
                var date = new Date(time * 1000);
                var currentDate = new Date();
                // console.log('currentDate' ,currentDate)
                // console.log('date 12', date)
                date = date.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
                return String(date);
        }
}