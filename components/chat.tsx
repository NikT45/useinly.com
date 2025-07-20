import { useConversation } from "@/context/ConversationProvider";

export function Chat() {

  const {messages} = useConversation();

  return (
    <div className="relative">
      <div className="flex flex-col w-full max-w-2xl mx-auto h-96 overflow-y-auto py-4 px-2">
        {messages.map(message => (
          <div key={message.id} className="whitespace-pre-wrap">
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  if (message.role === 'user') {
                      return (<div key={`${message.id}-${i}`} className=" my-4 flex justify-end">{<p className=" bg-brand-softPink text-brand-wine p-2 rounded-2xl">{part.text}</p>}</div>)
                  } else {
                      return (<div key={`${message.id}-${i}`} className="my-4 flex justify-left">{part.text}</div>)               
                  }  
              }
            })}
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  );
}