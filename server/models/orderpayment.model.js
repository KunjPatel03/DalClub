module.exports = (sequelize, DataTypes) => {
  const OrderLine = sequelize.define(
    'order_payment',
    {
      order_line_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_header_id: {
        type: DataTypes.INTEGER,
      },

      order_product_id: {
        type: DataTypes.INTEGER,
      },

      order_quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return OrderHeader;
};
