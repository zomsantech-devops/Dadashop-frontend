import moment from 'moment';
import 'moment/locale/th'; // Import Thai locale
import 'moment-timezone';

export function DateDisplay() {
  const gregorianYear = moment().year();
  const buddhistYear = gregorianYear + 543;
  const londonTime = moment.tz(moment(), 'Europe/London');
  const thaiDate = londonTime.locale('th').format(`ddddที่ D MMMM ${buddhistYear}`);

  return (
    <div>
      {thaiDate}
    </div>
  );
}
