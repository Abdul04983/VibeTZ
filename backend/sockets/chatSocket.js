module.exports = (io) => {
  io.on("connection", (socket) => {

    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
      io.emit("receiveMessage", { senderId, receiverId, message });
    });

    socket.on("disconnect", () => {
    });
  });
};
