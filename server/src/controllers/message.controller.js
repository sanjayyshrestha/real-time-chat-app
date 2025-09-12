import Message from "../models/message.model";
import User from "../models/user.model";

const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getting users : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user._id;

   const messages= await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    res.status(200).json(messages)
  } catch (error) {
    console.log("Error in getting messages : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendMessage=async(req,res)=>{
  try {
    const {text}=req.body;
    const userToChatId=req.params.id;
    const myId=req.user._id;
    const newMessage=new Message({
      senderId:myId,
      receiverId:userToChatId,
      text
    })

  
  } catch (error) {
    console.log("Error in sending messages : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}