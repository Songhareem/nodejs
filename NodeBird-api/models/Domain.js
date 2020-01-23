
module.exports = (sequelize, DataTypes) => {

    sequelize.define('domain', {
        // api를 쓸 수 있는 도메인 (localhost:8000 등이 들어감)
        host: {
            type: DataTypes.STRING(80),
            allowNull: false, 
        },
        // 유료/무료 사용자 (free/premium 등)
        type: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        // 시크릿키 (API KEY)
        clientSecret: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        paranoid: true,
        // 들어온 데이터 요소들(여기서는 host, type, clientSecret에 대한) 검증 
        validate: {
            // 함수명 등은 마음대로 정해도 됨
            unknownType() {
                if(this.type !== 'free' && this.type !== 'premium') {
                    throw new Error('type 컬럼은 free 또는 premium이어야 합니다');
                }
            }
        },
    })
};

// Domain.create({ host: })