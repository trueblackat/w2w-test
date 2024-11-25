import mitt from 'mitt';

type Events = {
  openUserDetailsModal: string;
}

export const eventBus = mitt<Events>();

export default eventBus;
