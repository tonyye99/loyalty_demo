import PointTransferModel, {
  IPointTransfer,
} from '../models/PointTransfer.model'

async function create(
  pointTransfer: Omit<IPointTransfer, 'point_transfer_id'>,
): Promise<IPointTransfer> {
  const createdPointTransfer = await PointTransferModel.create({
    ...pointTransfer,
  })
  return createdPointTransfer.toJSON()
}

export default { create }
