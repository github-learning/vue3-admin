import eventBus from '@/utils/event-bus-util'

export const useGlobalDialog = (callback: () => any) => {
  eventBus.emit('openGolbalDialog', '')
  eventBus.off('closeGolbalDialog')
  eventBus.on('closeGolbalDialog', async () => {
    await callback()
  })
}
