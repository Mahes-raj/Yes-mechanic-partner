import { FONTS } from '../../constants/constants';
import EnquiryForm from '../../pages/Enquiry/EnquiryForm';
import ReplyMessageList from './Replymsg';

const EnquiryPage = () => {
  return (
    <div className="h-full bg-[#E6A895]-400 px-6 py-10">
      <h1  className=" mb-10 " style={{...FONTS.header}}>  Interrogation</h1>
      {/* <h4  className="text-xl  text-center text-black-900" >get well soons as retify for your enquiry responses</h4> */}
     
      <div className="grid grid-cols-2 lg:grid-cols gap-8">
        <div className="bg-white p-6  rounded-lg shadow-md">
          <EnquiryForm />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[80vh]">
          <ReplyMessageList />
        </div>
      </div>
    </div>
  );
};

export default EnquiryPage;
