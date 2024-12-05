export type Announce = {
  announceID: string;
  title: string;
  description: string;
  runDate: string;
};

export interface AnnounceData {
  itemList: Announce[];
}
