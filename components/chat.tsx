import { useConversation } from "@/context/ConversationProvider";

export function Chat() {

  const {messages} = useConversation();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                if (message.role === 'user') {
                    return (<div key={`${message.id}-${i}`} className="flex justify-end">{part.text}</div>)
                } else {
                    return (<div key={`${message.id}-${i}`} className="flex justify-left">{part.text}</div>)               
                }  
            }
          })}
        </div>
      ))}
    </div>
  );
}