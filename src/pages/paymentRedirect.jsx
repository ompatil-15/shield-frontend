import { Link, useParams } from "react-router-dom";
import { useGetPaymentStatusQuery } from "../features/auth/authApiSlice";

const PaymentRedirect = () => {
  const { merchantTransactionId } = useParams();

  const {
    // eslint-disable-next-line no-unused-vars
    data: paymentStatus,
    isLoading,
    isSuccess,
    error
  } = useGetPaymentStatusQuery(merchantTransactionId, { skip: !(merchantTransactionId) });

  let content;
  if (isLoading) {
    content = (
        <div>
            <img src="/pending.svg" alt="check" className="mx-auto w-24 pb-7" />
            <h3>Please wait while we check the payment status and make changes</h3>
        </div>
    )
  } else if (isSuccess) {
    content = (
        <div>
            <img src="/check.svg" alt="check" className="mx-auto w-28" />
            <div className="text-center">
            <h3 className="text-xl md:text-3xl text-green-700 font-bold text-center">Your purchase is complete.</h3>
            <p className="text-sm my-2 md:text-lg">Enjoy lifetime security with SHIELD</p>
            <p className="text-xs my-2 md:text-sm">Login again to start using premium</p>
            <div className="pt-10 text-center">
                <Link to="/auth" className="px-6 bg-violet-700 hover:bg-violet-500 text-white font-semibold py-2 rounded-full">
                Account
                </Link>
            </div>
            </div>
        </div>
    );
  } else {
    if (error?.status === 422) {
        content = (
            <div className="text-red-500">Payment failed</div>
        )
    } else {
        content = <div className="text-red-500">An unexpected error occurred</div>;
    }
  }

  return (
    <main>
        <div className="bg-black h-screen flex items-center">
            <div className="bg-primary rounded-lg px-10 py-16 mx-auto text-zinc-400">
                {content}
            </div>
        </div>
    </main>
  );
};

export default PaymentRedirect;
