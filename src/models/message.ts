import { DataTypes, Model, Sequelize } from 'sequelize';
import { Subscription } from './subscription';

export class Message extends Model {
  public id!: number;
  public text!: string;
  public subscriptionId!: number;
  public createdAt!: Date;

  public readonly subscription?: Subscription;

  public static define(sequelize: Sequelize) {
    Message.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        text: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subscriptionId: {
          type: DataTypes.UUID,
          allowNull: false,
        },      
      },
      {
        sequelize,
        modelName: 'Message',
      }
    );
  
    Message.belongsTo(Subscription, {
      foreignKey: 'subscriptionId',
      as: 'subscription',
    });
  }  
}

export default (sequelize: Sequelize) => {


  return Message;
};
