import { randomUUID } from 'crypto';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class Subscription extends Model {
  public id!: number;

  public static define(sequelize: Sequelize) {
    Subscription.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: () => randomUUID(),
          primaryKey: true
        },
      },
      {
        sequelize,
        modelName: 'Subscription',
        hooks: {
          beforeSave(instance) {
            console.log('___________________', instance.toJSON());
            instance.set('id', randomUUID())
          },
        }
      }
    );
  }
}
