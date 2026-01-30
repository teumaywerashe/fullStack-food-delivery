import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const ordersId = searchParams.get("ordersId");
    // Added token from context
    const { url, token } = useContext(StoreContext); 
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
           
            const response = await axios.get(`${url}/order/verify?ordersId=${ordersId}`, {
                headers: { token } 
            });

            if (response.data.success) {
                navigate("/myorders");
            } else {
                // If payment failed on Chapa's end
                navigate("/");
            }
        } catch (error) {
            console.error("Verification API Error:", error);
            navigate("/");
        }
    };

    useEffect(() => {
       
        if (ordersId && token) {
            verifyPayment();
        } else if (!ordersId) {
            navigate("/");
        }
    }, [ordersId, token]); // Re-run if token loads late

    return (
        <div className='verify'>
            <div className="spinner"></div>
            <p>Processing payment confirmation...</p>
        </div>
    );
};

export default Verify;