import moment from "moment";

export const getInternalKeyForNewChatMessage = (timeNow, chatHistory) => {
  return `${timeNow.toString()}-${
    chatHistory ? chatHistory.length.toString() : "0"
  }`;
};

const isSameDate = (time1, time2) => {
  let date1 = new Date(time1);
  let date2 = new Date(time2);
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const getFormattedDateForSummaryBox = time => {
  if (isSameDate(new Date().getTime(), time)) {
    return moment(time).format("hh:mm a");
  } else {
    return moment(time).format("MMM DD");
  }
};

export const getFormattedDateOfMessage = time => {
  return new Date(time).toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

export const getMessagesToRenderFromChatHistory = chatHistory => {
  let messagesGroupedByDate = [];
  let messagesToRender = [];
  let currentTime = new Date().getTime();
  chatHistory.forEach(message => {
    let formattedDate = getFormattedDateOfMessage(message.time);
    let messagesForTheDate = messagesGroupedByDate.find(
      messageGroup => messageGroup.date === formattedDate
    );
    if (messagesForTheDate) {
      messagesForTheDate.messages.push(message);
      messagesToRender.push({ ...message, isDateStrip: false });
    } else {
      messagesGroupedByDate.push({ date: formattedDate, messages: [message] });
      messagesToRender.push({
        date: isSameDate(currentTime, message.time) ? "Today" : formattedDate,
        isDateStrip: true
      });
      messagesToRender.push({ ...message, isDateStrip: false });
    }
  });

  let lastSender = undefined;
  for (let i = 0; i < messagesToRender.length; i++) {
    let message = messagesToRender[i];
    let nextMessage =
      i + 1 < messagesToRender.length && !messagesToRender[i + 1].isDateStrip
        ? messagesToRender[i + 1]
        : undefined;
    if (message.isDateStrip) {
      lastSender = undefined;
    } else {
      if (message.sender !== lastSender) {
        message.firstOfGroup = true;
      }
      if (
        message.sender === lastSender &&
        nextMessage &&
        nextMessage.sender === message.sender
      ) {
        message.middleOfGroup = true;
      }
      if (!nextMessage || nextMessage.sender !== message.sender) {
        message.lastOfGroup = true;
      }
      lastSender = message.sender;
    }
  }

  return messagesToRender;
};
