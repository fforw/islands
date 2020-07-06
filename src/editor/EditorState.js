import { action, observable } from "mobx";


/**
 * Observable editor state.
 *
 * Created and kept outside react, modified by react.
 */
export default class EditorState
{
    /**
     * Creates a new instance
     *
     * @param tiles     tiles array
     */
    constructor(tiles)
    {
        this.tiles = tiles;
    }

    @observable
    visible = true;

    @observable
    dirty = false;

    @observable
    historyPos = 0;
    @observable
    historyEnd = 0;

    @observable
    activeTileIndex = 0;

    @action.bound
    toggleVisible(value = !this.visible)
    {
        this.visible = value;
    }

    @action
    updateHistory(historyPos, historyEnd = null)
    {
        this.historyPos = historyPos;
        if (historyEnd !== null)
        {
            this.historyEnd = historyEnd;
        }
    }


    @action.bound
    selectTile(tile)
    {
        this.activeTileIndex = tile;
    }

    @action
    setDirty(dirty)
    {
        this.dirty = dirty;
    }

    get activeTile()
    {
        const { activeTileIndex, tiles } = this;
        return tiles[activeTileIndex];
    }
}

