
import '../steps/Steps.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
    height: '560px',
    width: '100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


function RecomBlock() {
    const navigate = useNavigate();


    return (
        <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="mt-5 text-3xl text-[#ffd700]">ЧТО ТАКОЕ ИГРОТЕКИ?</h2>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
        </div>
        </>
    );
}

export default RecomBlock;