import { Link } from 'react-router-dom';

interface HomePageBtnProps {
    page: string;
    icon: string;
    text: string
}

function HomePageBtn({page, icon, text}: HomePageBtnProps) {
    return (
        <div>
            <Link to={page} className="z-10 homepage-btn w-[330px] px-[44px] py-[30px] flex flex-col text-2xl font-bold rounded-[30px] text-white gap-[21px]">
                <img src={icon} alt="" className='w-[48px]' />
                {text}
            </Link>
        </div>
    );
}
  
export default HomePageBtn;