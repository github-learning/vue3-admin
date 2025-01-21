import mitt from 'mitt'

type Events = {
  openGolbalDialog: string
  closeGolbalDialog: string
}

const emitter = mitt<Events>()
export default emitter
