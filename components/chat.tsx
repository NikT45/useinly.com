import { useConversation } from "@/context/ConversationProvider";

// Skeleton component for loading message
function MessageSkeleton() {
  return (
    <div className="my-4 flex justify-left text-brand-wine">
      <div className="space-y-2 w-full max-w-md">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
    </div>
  );
}

export function Chat() {

  const {messages, chatStatus, isLoading} = useConversation();

  // Test messages with lorem ipsum placeholder text
  //  const messages = [
  //   {
  //     id: 1,
  //     role: 'user',
  //     parts: [{
  //       type: 'text',
  //       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  //     }]
  //   },
  //   {
  //     id: 2,
  //     role: 'assistant',
  //     parts: [{
  //       type: 'text',
  //       text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  //     }]
  //   },
  //   {
  //     id: 3,
  //     role: 'user',
  //     parts: [{
  //       type: 'text',
  //       text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  //     }]
  //   },
  //   {
  //     id: 4,
  //     role: 'assistant',
  //     parts: [{
  //       type: 'text',
  //       text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  //     }]
  //   },
  //   {
  //     id: 5,
  //     role: 'user',
  //     parts: [{
  //       type: 'text',
  //       text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit?'
  //     }]
  //   }
  // ]; 
  return (
    <div className="relative">
      <div className={`flex flex-col w-full max-h-full max-w-2xl mx-auto h-90 overflow-y-auto py-4 px-2 ${messages.length > 0 ? 'pb-48' : ''}`}>
        {messages.map(message => (
          <div key={message.id} className="whitespace-pre-wrap">
            {message.role === 'user' ? (
              <div className="my-4 flex justify-end">
                <p className="bg-brand-softPink bg-opacity-50 text-brand-wine p-2 rounded-2xl">
                  {message.content}
                </p>
              </div>
            ) : (
              <div className="my-4 flex justify-left text-brand-wine">
                {message.content}
              </div>
            )}
          </div>
        ))}
        
        {/* Show skeleton when message is being submitted or streaming */}
        {(chatStatus === 'submitted' || chatStatus === 'streaming' || isLoading) && <MessageSkeleton />}
      </div>
    </div>
  );
}