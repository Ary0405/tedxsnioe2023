import './Speakers.scss';
import { motion } from 'framer-motion';

function Speakers({ speakers }) {
    return (
        <div className='Speakers'>
            <p className='Speakers__heading'>
                Speakers and Performers
            </p>
            <div className='Speakers__content'>
                {speakers.map((item, index) => {
                    return (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: .7 }}
                            key={index}
                        >
                            <div onClick={(e) => e.preventDefault()} key={item.name} className='Speakers__content--card'>
                                <img onClick={(e) => e.preventDefault()} className='Speakers__content--card__image' src={item.image} />
                                <div className='Speakers__content--card__details'>
                                    <p className='Speakers__content--card__details__name'>{item.name}</p>
                                    <p className='Speakers__content--card__details__desc'>{item.profession}</p>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

export default Speakers;