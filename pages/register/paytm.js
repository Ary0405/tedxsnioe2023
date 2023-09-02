import '../../styles/routes/google_pay.scss';
import useTicket from '../../hooks/useTicket'
import Link from 'next/link';
import { useState } from 'react';
import { payment } from '../../operations/payment.fetch';
import { useRouter } from 'next/router';
export default function PayTM() {
    const router = useRouter();
    const { noOfPeople, setNoOfPeople, ticketPrice, setTicketPrice, snu, setSnu, nameOne, nameTwo, emailOne, emailTwo, phoneOne, phoneTwo, modeOfPayment } = useTicket();
    const calculatePrice = () => {
        if (snu && noOfPeople) {
            return '800';
        } else if (snu && !noOfPeople) {
            return '1600';
        } else if (!snu && noOfPeople) {
            return '1000';
        } else {
            return '2000';
        }
    }
    const [tid, setTid] = useState('');
    const handleClick = async () => {
        if (tid === '') {
            alert('Please enter a vaid transaction id');
            return;
        } else {
            if (noOfPeople) {
                if (nameOne === '' || emailOne === '' || phoneOne === '' || modeOfPayment === '') {
                    console.log(nameOne, nameTwo, emailOne, emailTwo, phoneOne, phoneTwo, modeOfPayment);
                    alert('There is a problem from our side. Please refill the form without reloading the screen');
                    return;
                }
            } else {
                if (nameOne === '' || nameTwo === '' || emailOne === '' || emaiTwo === '' || phoneOne === '' || phoneTwo === '' || modeOfPayment === '') {
                    console.log(nameOne, nameTwo, emailOne, emaiTwo, phoneOne, phoneTwo, modeOfPayment);
                    alert('There is a problem from our side. Please refill the form without reloading the screen');
                    return;
                }
            }
            try {
                const data = {
                    'name1': nameOne,
                    'name2': nameTwo,
                    'email1': emailOne,
                    'email2': emailTwo,
                    'phone1': phoneOne,
                    'phone2': phoneTwo,
                    'modeOfPayment': modeOfPayment,
                    'noOfPeople': noOfPeople ? 1 : 2,
                    'amountPaid': noOfPeople ? 800 : 1200,
                    'snu': snu,
                    'tid': tid,
                    'paymentVerified': false,
                    'emailSent': false,
                }
                const response = await payment(data);
                if (response.status === 200) {
                    router.push('/register/confirm');
                } else {
                    alert('INTERNAL SERVER ERROR');
                    return;
                }
                console.log(data);
            } catch (e) {
                console.log(e);
                alert('INTERNAL SERVER ERROR');
            }
        }
    }
    return (
        <div className='GooglePay'>
            <div className='GooglePay__qr'>
                <p className='GooglePay__qr--text'>Scan the QR to Pay</p>
                <img className='GooglePay__qr--image' src='/Images/Assets/qr.png' />
                <div className='GooglePay__qr--TID'>
                    <input onChange={(e) => setTid(e.target.value)} type='text' placeholder='Transaction ID' required />
                </div>
                <p onClick={() => handleClick()} className='GooglePay__qr--bottom'>Proceed</p>
            </div>
            <div className='GooglePay__details'>
                <img className='GooglePay__details--image' src='/Images/Assets/payment.png' />
                <div className='GooglePay__details--priceDetails'>
                    <p>Price Details</p>
                    <div className='GooglePay__details--priceDetails__snu'>
                        <p>Type Of Person</p>
                        <p>{snu ? 'SNU' : 'NON-SNU'}</p>
                    </div>
                    <div className='GooglePay__details--priceDetails__people'>
                        <p>No. Of People</p>
                        <p>{noOfPeople ? '1' : '2'}</p>
                    </div>
                    <div className='GooglePay__details--priceDetails__ticket'>
                        <p>Ticket Price (per person)</p>
                        <p>{snu ? '800' : '1000'}</p>
                    </div>
                    <hr />
                    <div className='GooglePay__details--priceDetails__total'>
                        <p>Total Amount</p>
                        <p>{calculatePrice()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}