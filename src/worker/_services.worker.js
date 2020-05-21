import { RESPONSE_ERROR } from "./services-constants";


function reply(ticket, message)
{
    postMessage(
        {
            ticket,
            message
        }
    );
}

function error(ticket, error)
{
    reply(
        ticket,
        {
            type: RESPONSE_ERROR,
            error,
            ticket
        }
    );
}

function handleIncomingMessage(ev)
{
    const {message, ticket} = ev.data;
    const {type} = message;

    //console.log("handleIncomingMessage", ticket, message);


    switch (type)
    {
        // case QUERY_GENERATE:
        // {
        //     const {seed, size, reportProgress} = message;
        //
        //     console.log("Generating world '" + seed + "'");
        //
        //     const map = WorldMap.generate(
        //         size,
        //         seed,
        //         reportProgress &&
        //         (percent => reply(
        //             ticket,
        //             {
        //                 type: RESPONSE_PROGRESS,
        //                 percent,
        //             }
        //         ))
        //     );
        //
        //     const id = uuid.v4();
        //     map.worldId = id;
        //
        //     maps[id] = map;
        //
        //     reply(
        //         ticket,
        //         {
        //             type: RESPONSE_MAP,
        //             payload: map.serialize()
        //         });
        //     break;
        //
        // }
        //
        // case QUERY_PATH:
        // {
        //     const {worldId, sx, sy, ex, ey, reportSegments} = message;
        //
        //     //console.log("QUERY_PATH", {worldId, sx, sy, ex, ey, reportSegments})
        //
        //     const map = maps[worldId];
        //
        //     if (!map)
        //     {
        //         error(
        //             ticket,
        //             "Could not find map '" + worldId + "'"
        //         );
        //         return;
        //     }
        //
        //     const worldPath = macroPath(
        //         map,
        //         sx, sy,
        //         ex, ey
        //     );
        //     //console.log("World path for ticket #" + ticket, worldPath);
        //
        //     if (worldPath == null)
        //     {
        //         reply(
        //             ticket,
        //             {
        //                 type: RESPONSE_PATH,
        //                 path: null
        //             }
        //         );
        //     }
        //     else
        //     {
        //         paths.set(
        //             ticket,
        //             {
        //                 map,
        //                 worldPath,
        //                 pos: 0,
        //                 path: [],
        //                 reportSegments
        //             }
        //         );
        //
        //         setTimeout(doSubPathRoundRobin, 1);
        //     }
        //
        //     break;
        // }
        //
        // case MESSAGE_CANCEL_PATH:
        //     paths.delete(message.ticket);
        //     break;

        default:
            error(
                ticket,
                "Unhandled action: " + type
            );
            break;
    }

}


onmessage = ev => {

    // try
    // {
        return handleIncomingMessage(ev);
    // }
    // catch(e)
    // {
    //     console.error("Error handling incoming message", e);
    // }
};
